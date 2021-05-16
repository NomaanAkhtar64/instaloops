import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useInfluencerList, useNiche, useUser } from "../store";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [minRange, setMinRange] = useState("0");
  const [maxRange, setMaxRange] = useState("1000");
  const [rangeValue, setRangeValue] = useState("1000");

  const niches = useNiche();
  const influencers = useInfluencerList();
  const users = useUser();

  useEffect(() => {
    niches?.actions.fetch();
    influencers?.actions.fetch();
    // users?.actions.fetch();
    // console.log(users);
  }, []);

  return (
    <div className="home-page">
      <div className="divider box">
        <div className="filters-divide">
          <h1 className="title is-4" style={{ textAlign: "center" }}>
            Filters
          </h1>
          <hr />
          <h3 className="title is-6">Budget Range</h3>
          <div className="ranges">
            <div className="min">
              <label>Min</label>
              <input
                type="text"
                value={minRange}
                onChange={(e) => {
                  let reg = /[A-Za-z]/;
                  let newValue = e.target.value.replace(reg, "");
                  setMinRange(newValue);
                }}
              />
            </div>
            <div className="max">
              <label>Max</label>
              <input
                type="text"
                value={maxRange}
                onChange={(e) => {
                  let reg = /[A-Za-z]/;
                  let newValue = e.target.value.replace(reg, "");
                  setMaxRange(newValue);
                }}
              />
            </div>
          </div>
          <div className="range">
            <input
              type="range"
              min={minRange}
              max={maxRange}
              value={rangeValue}
              onChange={(e) => setRangeValue(e.target.value)}
              style={{ width: "100%", marginRight: "5px" }}
            />
            <p>{rangeValue}</p>
          </div>
          <hr />
          {niches?.state.hasLoaded ? (
            <>
              <h3 className="title is-6">Niche</h3>
              {niches.state.data.map((niche, i) => (
                <label key={i} className="checkbox">
                  <input type="checkbox" /> {niche.name}
                </label>
              ))}
            </>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="home-divide">
          <div className="search-bar">
            <input className="input" type="text" placeholder="Search" />
            <button className="button is-dark" title="Search">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="home-content">
            {influencers?.state.hasLoaded ? (
              <div className="influencers-container">
                {influencers.state.data.map((influencer, i) => (
                  <div key={i} className="influencer-body">
                    <div className="influ-images">
                      <div className="influ-banner">
                        <img src={influencer.banner} alt="" />
                      </div>
                      {/* <div className="influ-pic"> */}
                      <img className="influ-pic" src={influencer.pic} alt="" />
                      {/* </div> */}
                    </div>
                    <div className="influ-bio">
                      <p>{influencer.bio}</p>
                    </div>
                    <div className="influ-about">
                      <h4 className="title is-5">About:</h4>
                      <p>{influencer.about}</p>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
