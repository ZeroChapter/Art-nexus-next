import './BascketStyle.css'
import { useAppContext } from "../../shared/AppContextProvider.tsx";
import { useFormatPrice } from '../../entities/hooks/useFormatPrice';
import { useState, useRef } from 'react';
import { SERVER_URL } from '@/shared/serverConfig';

export const Bascket = () => {
    const { bascet, removeFromBascet, clearBascet } = useAppContext();
    const formatPrice = useFormatPrice();
    const [phone, setPhone] = useState('');
    const [delivery, setDelivery] = useState('cdek');
    const [isScrolled, setScrolled] = useState(false);
    const [isOrderSubmitted, setOrderSubmitted] = useState(false);
    const scrollRef = useRef(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            setScrolled(scrollRef.current.scrollTop > 10);
        }
    };

    const handleDeliveryChenge = (e) => {
        setDelivery(e.target.value);
    };

    const formatPhone = (digits) => {
        if (!digits) return '';
        let result = '+7';
        if (digits.length > 1) result += ' (' + digits.slice(1, 4);
        if (digits.length > 4) result += ') ' + digits.slice(4, 7);
        if (digits.length > 7) result += ' ' + digits.slice(7, 9);
        if (digits.length > 9) result += ' ' + digits.slice(9, 11);
        return result;
    };

    const handlePhoneChange = (e) => {
        let digits = e.target.value.replace(/\D/g, '');
        if (digits.length === 1 && digits[0] === '8') {
            digits = '7';
        } else if (digits.length > 0 && digits[0] !== '7' && digits[0] !== '8') {
            digits = '7' + digits;
        } else if (digits.length > 0 && digits[0] === '8') {
            digits = '7' + digits.slice(1);
        }
        setPhone(formatPhone(digits));
    };

    const postGoods = async (orderData) => {
        try {
            const response = await fetch(`${SERVER_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) throw new Error(`Ошибка! ${response.status}`);

            setOrderSubmitted(true);
            clearBascet();
            setPhone('');
        } catch (error) {
            console.error('Ошибка загрузки товаров', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const orderData = {
            items: bascet,
            totalPrice: summPrice(),
            customerName: formData.get('name') || 'Не указано',
            phone: phone,
            email: formData.get('email'),
            telegram: formData.get('telegram'),
            deliveryMethod: delivery
        };
        postGoods(orderData);
    };

    const summPrice = () => {
        return bascet.reduce((sum, item) => sum + item.price, 0);
    };

    const SuccessModal = () => (
        <div className="order-success-overlay">
            <div className="order-success-content">
                <h2>СПАСИБО!</h2>
                <p className='order-success-p'>Ваш заказ успешно оформлен.</p>
                <p className='order-success-p'>Менеджер свяжется с вами в ближайшее время для подтверждения.</p>
            </div>
        </div>
    );

    const miniatureCard = ({ image, name, price, color, size, itemIndex }) => {
        return (
            <div key={itemIndex}>
                <div className='basket-miniature'>
                    <img src={image} alt="" className="mini_image" />
                    <div className="info">
                        <div className="info-first_line">
                            <p>{name}</p>
                            <button className='delete_button' onClick={() => removeFromBascet(itemIndex)}>
                                удалить
                            </button>
                        </div>
                        <div className='price'>{formatPrice(price)}</div>
                        <div className='color_and_size'>
                            <div className='color_string'>
                                <div className="color_squer" style={{ backgroundColor: color.colorCode }}></div>
                                <p>{`цвет: ${color.colorName}`}</p>
                            </div>
                            <p className='color_and_size-size'>{`размер: ${size.name}`}</p>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
    };

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            {isOrderSubmitted && <SuccessModal />}
            <div className={`basket-head ${isScrolled ? 'scroll' : ''}`}>
                <h1 className='bascet-title'>ВАШ ЗАКАЗ</h1>
            </div>
            <div className='scroll-content' ref={scrollRef} onScroll={handleScroll}>
                <hr />
                {bascet.length > 0 ? (
                    <>
                        <div>
                            {bascet.map((item, index) =>
                                miniatureCard({
                                    image: item.image,
                                    name: item.name,
                                    price: item.price,
                                    color: item.selectedColor,
                                    size: item.selectedSize,
                                    itemIndex: index
                                })
                            )}
                        </div>
                        <p>{`Сумма: ${formatPrice(summPrice())}`}</p>
                        <div className="form__block">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input name='name' type="text" id="name" className='inputForm' placeholder=" " autoComplete="name" required />
                                    <label htmlFor="name" className='inputLabel'>ФИО</label>
                                </div>
                                <div className="form-group">
                                    <input name='phone' type="tel" id="number" value={phone} onChange={handlePhoneChange} maxLength={18} className='inputForm' placeholder=" " autoComplete="tel" required />
                                    <label htmlFor="number" className='inputLabel'>НОМЕР ТЕЛЕФОНА</label>
                                </div>
                                <div className="form-group">
                                    <input type="email" id="email" name="email" className='inputForm' placeholder=" " autoComplete="email" required />
                                    <label htmlFor="email" className='inputLabel'>E-MAIL</label>
                                </div>
                                <div className="form-group">
                                    <input type="text" id="telegram" name="telegram" className='inputForm' placeholder=" " />
                                    <label htmlFor="telegram" className='inputLabel'>TELEGRAM</label>
                                </div>
                                <div className="radio-button_group">
                                    <div className='radio-lable_group'>
                                        <input type="radio" id="delivery-cdek" name="radio" className='radio_button' value="cdek" checked={delivery === 'cdek'} onChange={handleDeliveryChenge} />
                                        <label htmlFor="delivery-cdek" className="radio-label">СДЕК</label>
                                    </div>
                                    <div className='radio-lable_group'>
                                        <input type="radio" id="delivery-yandex" name="radio" className='radio_button' value="yandex" checked={delivery === 'yandex'} onChange={handleDeliveryChenge} />
                                        <label htmlFor="delivery-yandex" className="radio-label">Яндекс GO</label>
                                    </div>
                                    <div className='radio-lable_group'>
                                        <input type="radio" id="delivery-self" name="radio" className='radio_button' value="self" checked={delivery === 'yandex'} onChange={handleDeliveryChenge} />
                                        <label htmlFor="delivery-self" className="radio-label">Доставка с примеркой</label>
                                    </div>
                                    <p className='message-box'>
                                        Заявки обрабатываются с 10:00 до 21:00 ежедневно.
                                        После оформления заказа на сайте с вами свяжется менеджер online для подтверждения заказа!
                                    </p>
                                    <p className='total_summ'>{`Итоговая сумма: ${formatPrice(summPrice())}`}</p>
                                    <button className='submit__button' type='submit'>Оформить заказ</button>
                                    <p className='bottom-string'>Нажимая на кнопку, вы соглашаетесь с условиями <a>политики конфидециальности</a></p>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <p>Ваша корзина пуста</p>
                    </div>
                )}
            </div>
        </div>
    );
};