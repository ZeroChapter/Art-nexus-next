import Image from "next/image";
import "./Baner.css";

export const Baner = () => {
  return (
    <div className="baner">
      <div className="baner_image">
        <Image
          alt="Девушка в жемчужной маске гонит гусей"
          src="https://i.pinimg.com/736x/21/78/a0/2178a0e8dee4eb2eceb9751130671d57.jpg"
          fill
          sizes="415px"
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
      <div className="baner_text">
        <h2 className="baner_text-title">Доставка с примеркой по Москве</h2>
        <div className="baner_text-content">
          <p className="baner_text-grey">*Стоимость доставки — бесплатно.</p>
          <p className="baner_text-description">
            Примеряйте, решайте, <br />
            оставайтесь с тем, что действительно ваше.
          </p>
        </div>
      </div>
    </div>
  );
};
