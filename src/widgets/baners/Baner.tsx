import './Baner.css'

export interface BanerProps {
    image: string
    title: string
    description: string
    link: string
}

export const Baner = () => {
    return (
        <div className="baner">
                <img 
                className='baner_image'
                alt="Девушка в жемчужной маске гонит гусей" 
                src="https://i.pinimg.com/736x/19/e2/e8/19e2e88ea307c7991e17beb01d93299d.jpg" />
            <div className='baner_text'>
                <h2 className='baner_text-title'>Доставка с примеркой по Москве</h2>
                <div className='baner_text-content'>
                <p className='baner_text-grey'>*Стоимость доставки — 500 ₽. <br/>При выкупе изделия доставка становится бесплатной.</p>
                <p className='baner_text-description'>Примеряйте, решайте, <br/>
                оставайтесь с тем, что действительно ваше.</p>
                </div>
            </div>
        </div>
    )
}
