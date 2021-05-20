import axios from "axios";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Spinner from "../components/Spinner";
import { API_URL } from "../const";
import { useInfluencer, useInfluencerList } from "../store";

interface MatchParams {
  id: string;
}

interface InfluencerDetailProps extends RouteComponentProps<MatchParams> {}

const InfluencerDetail: React.FC<InfluencerDetailProps> = ({ match }) => {
  // const influncer = useInfluencerList();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  console.log(match.params.id);

  useEffect(() => {
    // influncer?.actions.fetch();
    axios
      .get(`${API_URL}/api/social/influencers/${match.params.id}`)
      .then((res) => {
        setInfluencer(res.data);
        console.log(typeof(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* {influncer?.state.hasLoaded ? ( */}
      <div className="influencer-detail">
        <div className="ID-body box">
          <div className="ID-images">
            <div className="ID-banner">
              <img src={influencer?.banner} alt="" />
            </div>
            <img
              className="ID-pic"
              src={influencer?.pic}
              alt=""
            />
          </div>
          <div className="ID-content">
              <div className="influ-bio">
              <p>{influencer?.bio}</p>
            </div>
            <div className="ID-about">
              <h4 className="title is-5">About:</h4>
              <p>{influencer?.about}</p>
            </div>
            <div className="ID-rating">
              <p>{influencer?.rating}</p>
            </div>
            </div>
        </div>
      </div>
      {/* ) : (
        <Spinner /> */}
      {/* )} */}
    </>
  );
};

export default InfluencerDetail;
