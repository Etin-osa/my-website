// import Image from "next/image";
import "./page.scss";

export default function Home() {
    return (
        <div className="app">
            <div className="app-text">
                <div className="app-text__header">
                    <div>
                        <div>ETIN-OSA</div>
                        <div>ENOGIOMWAN</div>
                        <span>FRONTEND DEVELOPER</span>
                    </div>

                    <div>
                        <div>CONTACT</div>
                    </div>
                </div>

                <div className="app-text__body">
                    <div className="repsol">
                        <div>R</div>
                        <div>E</div>
                        <div>P</div>
                        <div>S</div>
                        <div>O</div>
                        <div>L</div>
                    </div>
                    {/* <div>NARIA</div> */}
                </div>
            </div>

            <div className="app-image">
                <div className="app-image__header">
                    <button>
                        <span>VISIT WEBSITE</span>
                    </button>
                </div>

                <div className="app-image__number">
                    <div>001</div>
                </div>

                <div className="app-image__container">

                </div>
            </div>
        </div>
    );
}
