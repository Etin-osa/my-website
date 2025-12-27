import React from "react";
import Image from "next/image";
import IosButton from "./IosButton";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import MagneticDotsBackground from "./MagneticDotsBackground";

import "@/styles/footer.scss";
import MotionView from "./MotionView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { content, Language } from "@/data/content";

export default function FooterSection({ langKey }: { langKey: Language }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <MotionView isDesktop={isDesktop} htmlTag="footer" normal htmlProps={{ className: "footer-section" }}>
            <div className="footer-bg">
                <div className="footer-content">
                    <div className="footer-cta">
                        <MagneticDotsBackground />

                        <div className="footer-cta-cover">
                            <div className="footer-images">
                                <div className="footer-img-wrapper">
                                    <Image 
                                        src="/images/speaker_blue.jpg" 
                                        alt="profile 1" 
                                        width={60} 
                                        height={60} 
                                        className="footer-img" 
                                    />
                                </div>
                                <div className="footer-img-wrapper">
                                    <Image 
                                        src="/images/speaker_orange.jpg" 
                                        alt="profile 2" 
                                        width={60} 
                                        height={60} 
                                        className="footer-img" 
                                    />
                                </div>
                            </div>
                            
                            <h2 className="footer-title">
                                {content[langKey].footer.title}
                            </h2>
                            
                            <div className="footer-btn-wrapper">
                                <IosButton text={content[langKey].footer.cta} className="footer-btn" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="footer-bottom-container">
                        <div className="footer-bottom">
                            <div className="footer-social">
                                {content[langKey].footer.follow} <span className="icon-box"><FaTwitter /></span> {content[langKey].footer.touch} <span className="icon-box"><FaLinkedinIn /></span>
                            </div>
                            <div className="footer-credits">
                                <span>{content[langKey].footer.credits} <a style={{ paddingLeft: '2px'}} href="https://www.framer.com/@akim-perminov/" target="_blank" rel="noopener noreferrer">Akim</a></span>
                                <span>{content[langKey].footer.developed}</span>
                            </div>
                        </div>

                        <div className="footer-big-text">
                            <div><h1>Let's</h1></div>
                            <div><h1>Work</h1></div>
                        </div>
                    </div>
                </div>
            </div>
        </MotionView>
    );
}
