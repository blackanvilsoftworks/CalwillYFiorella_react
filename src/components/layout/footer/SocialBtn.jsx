import { memo } from 'react';
import useSocialMedia from '../../../hooks/useSocialMedia.js';

const SocialBtn = memo(({ globalInfo }) => {
    const { arrSocialMedia, onClickHandler } = useSocialMedia(globalInfo);
    return (
        <div className="row">
            {arrSocialMedia?.map(({ name, icon, color }) => {
                const displayName = name.charAt(0).toUpperCase() + name.slice(1);
                return (
                    <div key={name} className="col-12 col-sm-6 mb-3">
                        <button
                            id={name}
                            className={`btn btn-outline-${color} w-100`}
                            type="button"
                            onClick={onClickHandler}
                            aria-label={`Contactar por ${displayName}`}
                        >
                            <i className={icon} aria-hidden="true"></i>
                            <span className="ms-2">{displayName}</span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
});

export default SocialBtn;