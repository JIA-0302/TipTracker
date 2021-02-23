const ScreenLoader = (): JSX.Element => {
  return (
    <div id="preloader">
      <div id="ctn-preloader" className="ctn-preloader">
        <div className="animation-preloader">
          <div className="spinner"></div>
          <div className="txt-loading">
            <span data-text-preloader="T" className="letters-loading gold-text">
              T
            </span>
            <span data-text-preloader="I" className="letters-loading gold-text">
              I
            </span>
            <span data-text-preloader="P" className="letters-loading gold-text">
              P
            </span>
            <span data-text-preloader="T" className="letters-loading">
              T
            </span>
            <span data-text-preloader="R" className="letters-loading">
              R
            </span>
            <span data-text-preloader="A" className="letters-loading">
              A
            </span>
            <span data-text-preloader="C" className="letters-loading">
              C
            </span>
            <span data-text-preloader="K" className="letters-loading">
              K
            </span>
            <span data-text-preloader="E" className="letters-loading">
              E
            </span>
            <span data-text-preloader="R" className="letters-loading">
              R
            </span>
          </div>
          <p className="text-center">· · · Loading · · ·</p>
        </div>
        <div className="loader">
          <div className="row">
            <div className="col-3 loader-section section-left">
              <div className="bg"></div>
            </div>
            <div className="col-3 loader-section section-left">
              <div className="bg"></div>
            </div>
            <div className="col-3 loader-section section-right">
              <div className="bg"></div>
            </div>
            <div className="col-3 loader-section section-right">
              <div className="bg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenLoader;
