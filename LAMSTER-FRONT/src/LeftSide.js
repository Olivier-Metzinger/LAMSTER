export default function LeftSide() {
    return (
        <div
            className="col no-gutters"
            style={{
                backgroundImage: `url("wallpaper.jpg")`,
                backgroundSize: "cover",
            }}
        >
            <div className="leftside-title">
                <p className="title"> Bonjour à tous </p>
                <p className="description"> Bienvenue sur Lamster! </p>
            </div>
            <div className="social-link-footer">
                <img
                    className="social-link-icon "
                    src="twitter.svg"
                    alt="twittericon"
                />
                <img
                    className="social-link-icon "
                    src="facebook.svg"
                    alt="facebookicon"
                />
                <img
                    className="social-link-icon "
                    src="instagram.svg"
                    alt="instagramicon"
                />
            </div>
        </div>
    );
}
