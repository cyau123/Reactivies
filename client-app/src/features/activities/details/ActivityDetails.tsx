import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function ActivityDetails() {

  const {activityStore} = useStore();
  //selectedActivity: activity - is to give it a name of "activity"
  const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

  // if activity get by id is undefined, then return
  if(!activity) return <LoadingComponent />;

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
            <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    )
}