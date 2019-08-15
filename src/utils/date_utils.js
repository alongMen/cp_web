import moment from 'moment';

export const formatBeijingDate = str => {
  if(!str){
    return '';
  }

  // return (new Date(str)).toDateString

  return moment(str).format('YYYY-MM-DD HH:mm');
};
