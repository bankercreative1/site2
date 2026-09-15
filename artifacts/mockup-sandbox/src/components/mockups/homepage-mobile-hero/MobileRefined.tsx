import "./_group.css";

export function MobileRefined() {
  return (
    <div className="siteflyer-mobile-hero">
      <header className="siteflyer-mobile-header">
        <img
          className="siteflyer-mobile-logo"
          src="/__mockup/images/siteflyer-logo.svg"
          alt="SiteFlyer"
        />
        <button className="siteflyer-mobile-menu" type="button" aria-label="Open navigation">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="siteflyer-mobile-main">
        <img
          className="siteflyer-mobile-laptop"
          src="/__mockup/images/siteflyer-laptop.png"
          alt="Example SiteFlyer website displayed on a laptop"
        />

        <h1 className="siteflyer-mobile-title">
          <span>Serious websites</span>
          <span>for serious business</span>
        </h1>

        <p className="siteflyer-mobile-subtitle">
          <span className="siteflyer-mobile-subtitle-primary">Custom design · Professional copy</span>
          <span>Built to get found</span>
        </p>

        <div className="siteflyer-mobile-actions">
          <a className="siteflyer-mobile-action" href="#get-started">Get Started</a>
          <a className="siteflyer-mobile-action siteflyer-mobile-action-primary" href="#pricing">See Pricing</a>
        </div>
      </main>
    </div>
  );
}