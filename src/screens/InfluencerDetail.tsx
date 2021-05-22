import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import Spinner from '../components/Spinner'
import { API_URL } from '../const'
import { useInfluencerDetail } from '../store'

interface MatchParams {
  id: string
}

interface InfluencerDetailProps extends RouteComponentProps<MatchParams> {}

const InfluencerDetail: React.FC<InfluencerDetailProps> = ({ match }) => {
  const id = match.params.id
  const influencer = useInfluencerDetail()

  useEffect(() => {
    influencer.actions.fetch(parseInt(id))
  }, [id])

  if (influencer.state.hasLoaded) {
    return (
      <div className='influencer-detail'>
        <div className='ID-body box'>
          <div className='ID-images'>
            <div className='ID-banner'>
              <img src={`${API_URL}${influencer.state.data.banner}`} alt='' />
            </div>
            <img className='ID-pic' src={`${API_URL}${influencer.state.data.pic}`} alt='' />
          </div>
          <div className='ID-content'>
            <div className='influ-bio'>
              <p>{influencer.state.data.bio}</p>
            </div>
            <div className='ID-about'>
              <h4 className='title is-5'>About:</h4>
              <p>{influencer.state.data.about}</p>
            </div>
            <div className='ID-rating'>
              <p>{influencer.state.data.rating}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <Spinner />
}

export default InfluencerDetail
