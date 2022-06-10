import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

function Footer() {
    return (
        <div className="w-full text-center mt-2">
            <p className="text-slate-300">Developed by Muhammed Seyhan</p>
            <p className="text-3xl">
                <a
                    href="https://github.com/muhammedseyhann"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon
                        icon={faGithub}
                        className="mr-2 hover:text-white hover:bg-primary rounded-full align-middle"
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/muhammedseyhann/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon
                        icon={faLinkedin}
                        className="hover:text-white hover:bg-primary align-middle"
                    />
                </a>
            </p>
        </div>
    );
}

export default memo(Footer);
