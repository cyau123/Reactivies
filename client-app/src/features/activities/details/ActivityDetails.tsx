import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {

  const {activityStore} = useStore();
  //selectedActivity: activity - is to give it a name of "activity"
  const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;

  //get id from url, useParams from react router dom
  const {id} = useParams();

  // change selectedActivity to the selected one
  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity])

  // if activity get by id is undefined, then return LoadingComponent
  if(loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Grid>
          <Grid.Column width={10}>
            <ActivityDetailedHeader activity={activity}/>
            <ActivityDetailedInfo activity={activity}/>
            <ActivityDetailedChat />
          </Grid.Column>
          <Grid.Column width={6}>
            <ActivityDetailedSidebar activity={activity}/>
          </Grid.Column>
        </Grid>
    )
})