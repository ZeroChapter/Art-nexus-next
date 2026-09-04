import Image from "next/image";
import bannerImage from "@/assets/bannerImage.jpg";
import "./Baner.css";

export const Baner = () => {
  return (
    <div className="baner">
      <div className="baner_image">
        <Image
          alt="Детали дизайнерской одежды Art Nexus на фоне зелёной травы"
          src={bannerImage}
          fill
          sizes="415px"
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </div>
      <div className="baner_text">
        <h2 className="baner_text-title">
          Доставка с&nbsp;примеркой по&nbsp;Москве
        </h2>
        <div className="baner_text-content">
          <p className="baner_text-grey">*Стоимость доставки — бесплатно.</p>
          <p className="baner_text-description">
            Примеряйте, решайте, <br />
            оставайтесь с&nbsp;тем, что действительно ваше.
          </p>
        </div>
      </div>
    </div>
  );
};
