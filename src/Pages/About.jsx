import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    const handleVideoClick = () => {
        navigate('/intro');
    };

    return (
        <div className="bg-login-background bg-repeat bg-cover bg-center bg-fixed min-h-screen w-full">
            <div className="w-full bg-[#860074] md:px-20 px-10 py-6 flex items-center justify-center">
                <h1 className="text-white text-2xl font-bold">Tunkol sa E-Buksan</h1>
            </div>

            <div className="max-w-5xl mx-auto px-5 py-6 space-y-8">
                <section>
                    <h2 className="text-white text-xl font-semibold">Mga Aklat:</h2>
                    <div className="text-white pt-2 space-y-2">
                        <p>Almario, V. S. (2004). <span className="italic">Panitikan ng Pilipinas: Kasaysayan at pag-unlad.</span> Adarna House.</p>
                        <p>Santos, L. K. (1940). <span className="italic">Balarila ng wikang pambansa.</span> Surian ng Wikang Pambansa.</p>
                        <p>Balmaseda, J. C. (1938). <span className="italic">Ang panulaang Tagalog.</span> J. Martinez.</p>
                        <p>Abadilla, A. G. (1952). <span className="italic">Mga tinig ng makata.</span> Ateneo de Manila Press.</p>
                        <p>San Juan, E. (1974). <span className="italic">Introduction to modern Pilipino literature.</span> Bookmark Inc.</p>
                    </div>
                </section>

                <hr className="border-white" />

                <section>
                    <h2 className="text-white text-xl font-semibold">Artikulo:</h2>
                    <div className="text-white pt-2">
                        <p>Lumbera, B. (1984). Revaluation: <span className="italic">Essays on Philippine literature, theatre, and popular culture.</span> University of the Philippines Press.</p>
                    </div>
                </section>

                <hr className="border-white" />

                <section>
                    <h2 className="text-white text-xl font-semibold">Mga Online Sources:</h2>
                    <div className="text-white pt-2 space-y-2">
                        <p>
                            Komisyon sa Wikang Filipino. (n.d.). <span className="italic">Mga publikasyon. </span>
                            <a href="https://kwf.gov.ph" target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-500">https://kwf.gov.ph</a>
                        </p>
                        <p>
                            National Commission for Culture and the Arts. (n.d.). <span className="italic">Philippine literature. </span>
                            <a href="https://ncca.gov.ph" target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-500">https://ncca.gov.ph</a>
                        </p>
                        <p>
                            Philippine E-Journals. (n.d.). <span className="italic">Home. </span>
                            <a href="https://www.ejournals.ph" target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-500">https://www.ejournals.ph</a>
                        </p>
                        <p>
                            <a href="https://www.deped.gov.ph/wp-content/uploads/2019/01/Filipino-CG.pdf" target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-500">
                                Filipino Curriculum Guide (2019)
                            </a>
                        </p>
                        <p>
                            <a href="https://www.deped.gov.ph/wp-content/uploads/MATATAG-FILIPINO-CG-Grades-4-at-7-.pdf" target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-500">
                                MATATAG Filipino CG (Grades 4 & 7)
                            </a>
                        </p>
                        <p>
                            <a href="https://www.studocu.com/ph/document/governor-alfonso-d-tan-college/bsed-biology/filipino-cg-curriculum-guide/59629233" target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-500">
                                Filipino CG Curriculum Guide – Studocu
                            </a>
                        </p>
                        <p>
                            Saligang Batas ng Pilipinas (1987). Available at:
                            <a href="https://wikisource.org/wiki/Saligang_Batas_ng_Pilipinas_(1987)" target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-500"> Wikisource</a>
                        </p>
                        <p>
                            September 24, 2013 – Implementing Rules and Regulations of RA 10533:
                            <a href="https://www.deped.gov.ph/2013/09/24/do-43-s-2013-implementing-rules-and-regulations-irr-of-republic-act-no-10533-otherwise-known-as-the-enhanced-basic-education-act-of-2013/" target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-500">
                                Basahin dito
                            </a>
                        </p>
                        <p>
                            Almario, Virgilio (2017). *Taludtod at Talinghaga: Mga Sangkap sa Katutubong Pagtula*. Komisyon ng Wikang Filipino. ISBN 978-621-8064-60-7
                        </p>
                    </div>
                </section>

            </div>
            <button
                onClick={handleVideoClick}>
                viddeo
            </button>
        </div>
    );
};

export default About;
