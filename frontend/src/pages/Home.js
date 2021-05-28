import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";

import HomeNoLog from "../components/HomeNoLog";
import Navbar from "../components/Navbar";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <>
      {uid ? (
        <div className="home-container">
          <div className="nav">
            <Navbar />
          </div>
          <div className="home-header">
            <img src="./img/tennis-home.jpeg" alt="home-logo" />
            <div className="home-header__title">
              <h1 className="home-title">Bienvenue</h1>
            </div>
          </div>
          <div className="main-content">
            <div className="scroll-icon-container">
              <img src="./img/icons/arrow-down.svg" alt="arrow-down" />
            </div>
            <h2 className="content-title">Qui suis-je ?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias,
              aperiam. Ipsa cupiditate rerum doloremque. Reiciendis quae ipsum
              quas eligendi eveniet quaerat, similique laudantium fuga ad quidem
              tempora harum corrupti esse culpa explicabo sint molestias
              voluptatibus quibusdam tenetur. Sint, eius! Omnis iusto itaque
              quas fugiat debitis odio in, sunt ad voluptate eius molestias,
              aliquam molestiae delectus ex dolorem soluta sapiente! Esse in
              sapiente itaque officia. At numquam ab nemo laboriosam ea sapiente
              suscipit cupiditate enim illo dolore, saepe blanditiis delectus
              accusamus esse odio magnam corrupti ut veniam nisi sed
              perspiciatis tempore aperiam sequi! Fugiat asperiores tempora eos
              qui facilis error deleniti.
            </p>
            <h2 className="content-title">Présentation du site</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              necessitatibus quia porro doloribus harum ducimus eaque saepe
              facilis itaque possimus nobis suscipit quae dolor natus pariatur
              repudiandae quasi, quod nulla id perspiciatis excepturi debitis.
              Libero repellat, voluptatem nam est cupiditate consequuntur illo,
              commodi modi molestias voluptate dolores vero possimus minima?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem incidunt ipsum quam itaque quisquam beatae consequatur
              voluptas perferendis nulla maiores molestiae deleniti quis alias,
              quibusdam minus sint sit laudantium. Ratione velit mollitia ea
              voluptatibus dignissimos fuga ducimus autem! Omnis cumque deleniti
              exercitationem debitis. Minus perferendis corporis sapiente alias
              ullam adipisci.
            </p>
          </div>
        </div>
      ) : (
        <div className="home-container">
          <div className="nav">
            <Navbar />
          </div>
          <HomeNoLog />
        </div>
      )}
    </>
  );
};

export default Home;
