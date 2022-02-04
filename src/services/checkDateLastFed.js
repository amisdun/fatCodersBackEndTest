import { differenceInSeconds } from 'date-fns';

const checkTimeLastFed = async (FeedDate, dateLastFed) => {
  if (!dateLastFed) return;
  const exceededFiveSeconds = differenceInSeconds(FeedDate, dateLastFed);
  console.log(exceededFiveSeconds);
  if (Math.abs(exceededFiveSeconds) <= 5)
    throw new Error('You can only feed a farm unit in 5 seconds interval');
};

export { checkTimeLastFed };
