import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
const desc = "Take A Good Shop With Just Click , D'ont Forget tu use Our Application , ...Be Pround   "
const AppSection = () => {
    const { t } = useTranslation();
    return (
        <div className='app-section padding-tb' >
            <div className="container">
                <div className="section-header text-center " >
                    <Link to="sign-up" className='lab-btn mb-4'> {t(`signUpForFree`)} </Link>
                    <h2 className='title' > {t(`shopAnyTimeAnywhere`)} </h2>
                    <p>{t(`appSectionDesc`)}</p>
                </div>
                <div className="section-wrapper">
                    <ul className='lab-ul' >
                        <li><a href="#"  ><img src="/src/assets/images/app/01.jpg" alt="" /> </a></li>
                        <li><a href="#"  ><img src="/src/assets/images/app/02.jpg" alt="" /> </a></li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AppSection