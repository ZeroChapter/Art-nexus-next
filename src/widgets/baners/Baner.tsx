import "./Baner.css";

export interface BanerProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

export const Baner = () => {
  return (
    <div className="baner">
      <img
        className="baner_image"
        alt="Девушка в жемчужной маске гонит гусей"
        src="https://i.pinimg.com/736x/21/78/a0/2178a0e8dee4eb2eceb9751130671d57.jpg"
      />
      <div className="baner_text">
        <h2 className="baner_text-title">Доставка с примеркой по Москве</h2>
        <div className="baner_text-content">
          <p className="baner_text-grey">
            *Стоимость доставки — 500 ₽. <br />
            При выкупе изделия доставка становится бесплатной.
          </p>
          <p className="baner_text-description">
            Примеряйте, решайте, <br />
            оставайтесь с тем, что действительно ваше.
          </p>
        </div>
      </div>
    </div>
  );
};
