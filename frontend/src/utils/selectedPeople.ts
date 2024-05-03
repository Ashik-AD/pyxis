// 10/10
const selectedPeople = (crew: any[]): any[] => {
  const people:any = {};
  crew.forEach((el) => {
    jobs.forEach((jb) => {
      if (el.job.toLocaleLowerCase() === jb.key) {
        if (people.hasOwnProperty(`a${el.id}`)) {
          const jbs = { ...people[`a${el.id}`] };
          jbs.job = `${jbs.job}/${jb.tag}`;
          if (jbs.order <= jb.order) {
            jbs.order = jb.order;
          }
          people[`a${el.id}`] = jbs;
          return;
        }
        const jbs = { ...el };
        jbs.job = jb.tag;
        jbs.order = jb.order;
        people[`a${el.id}`] = jbs;
      }
    });
  });
  return Object.values(people).sort((a:any, b:any) => a.order - b.order);
};
const jobs = [
  { key: 'director', tag: 'Director', order: 1 },
  { key: 'executive producer', tag: 'Executive Producer', order: 3 },
  { key: 'producer', tag: 'Producer', order: 2 },
  { key: 'writer', tag: 'Writer', order: 2 },
  { key: 'casting', tag: 'Casting Director', order: 4 },
  { key: 'director of photography', tag: 'Cinematography', order: 5 },
  { key: 'original music composer', tag: 'Music Composer', order: 6 },
];
export default selectedPeople;