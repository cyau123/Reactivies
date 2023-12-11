import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';
import { Fragment } from 'react';

// make this an observer
export default observer(function ActivityList(){
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;

    //display date and then a list of activities under the date
    return (
        <>
            {/* iterate over each [key, value] pair in groupedActivities and [group, activities] is array destructuring*/}
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {activities.map((activity) => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})