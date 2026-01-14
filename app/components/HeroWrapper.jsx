const HeroWrapper = ({ children }) => {
    return (
        <div
            className="w-full"
            style={{
                background:
                    'linear-gradient(to bottom, #F6C1AE 0%, #FAD8CB 25%, #FFFFFF 50%, #FFFFFF 100%)',
            }}
        >
            {children}
        </div>
    );
};

export default HeroWrapper;
