"use client"
import Image from "next/image"
import Link from "next/link"
import Arrow from "@/components/common/Arrow"

const Banner = () => {
    return (
        <section className="hero-section">
            <div className="hero-texture-bg" />

            {/* Desktop Hero Image (hidden on mobile) */}
            <div className="hero-image-wrapper d-none d-lg-block">
                <div className="hero-image-primary-bg" />
                <div className="hero-image-clip">
                    <Image
                        src="/hero-image.avif"
                        alt="100exNextGen Hero"
                        fill
                        sizes="50vw"
                        style={{ objectFit: "cover" }}
                        priority
                    />
                    <div className="hero-image-overlay" />
                </div>
            </div>

            {/* Content */}
            <div className="container hero-container">
                <div className="row align-items-center" style={{ height: "100%" }}>
                    <div className="col-lg-6 col-md-12">
                        <div className="hero-content-wrap">
                            <span className="hero-subtitle">
                                Scaling and Growing Enterprises
                            </span>
                            <h1 className="hero-title">
                                Accelerating the Future with{" "}
                                <span className="hero-100ex">100ex</span><span className="hero-nextgen">NextGen</span>
                            </h1>
                            <p className="hero-desc">
                                Growth partner for revenue-stage enterprises 
                                (sector agnostic), and early-stage Space-Tech founders.
                            </p>
                            <div className="hero-btn-group">
                                <Link href="/#contact" className="tg-btn tg-btn-seven hero-btn-main">
                                    Get In Touch <Arrow />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Hero Image (hidden on desktop) */}
                    <div className="col-12 d-block d-lg-none mt-4 mt-md-5">
                        <div className="mobile-hero-image-wrap" style={{ position: "relative" }}>
                            <Image
                                src="/hero-image.avif"
                                alt="100exNextGen Hero"
                                fill
                                sizes="100vw"
                                style={{ objectFit: "cover" }}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
