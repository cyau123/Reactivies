import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

// make this component an observer to observe loadActivity and loadingInitial
export default observer(function ActivityDetails() {

  const {activityStore} = useStore();
  //selectedActivity: activity - is to give it a name of "activity"
  const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;

  //get id from url, useParams from react router dom
  const {id} = useParams();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity])

  // if activity get by id is undefined, then return
  if(loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span>{activity.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group width='2'>
            <Button as={Link} to={`/manageActivity/${activity.id}`} basic color='blue' content='Edit' />
            <Button as={Link} to='/activities' basic color='grey' content='Cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    )
})