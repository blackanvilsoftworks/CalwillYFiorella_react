export const createTitle = (title, icon) => {
    return (
        <span className="title">
            {title}
            <i className={icon}></i>
        </span>
    );
};
