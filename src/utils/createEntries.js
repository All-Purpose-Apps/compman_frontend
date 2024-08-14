export const checkCouples = ({ data }, coupleData) => {
  const combinations = generateCombinations(coupleData.leader, coupleData.follower, coupleData.dance, coupleData.level, coupleData.ageCategory);
  for (const couple of data) {
    for (const combination of combinations) {
      if (
        couple.leader._id === combination.leader &&
        couple.follower._id === combination.follower &&
        couple.dance._id === combination.dance &&
        couple.level === combination.level &&
        couple.ageCategory === combination.ageCategory
      ) {
        const index = combinations.indexOf(combination);
        if (index > -1) {
          combinations.splice(index, 1);
        }
      }
    }
  }
  return combinations;
};

function generateCombinations(leader, follower, dances, levels, ageCategories) {
  const combinations = [];

  for (const dance of dances) {
    for (const level of levels) {
      for (const ageCategory of ageCategories) {
        combinations.push({
          leader: leader,
          follower: follower,
          dance: dance,
          level: level,
          ageCategory: ageCategory,
        });
      }
    }
  }

  return combinations;
}
