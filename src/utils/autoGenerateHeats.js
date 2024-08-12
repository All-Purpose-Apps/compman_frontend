export function autoGenerateHeats(timeRange, couples, currentHeats) {
  const times = generateTimeIntervals(timeRange.start.toDate(), timeRange.end.toDate(), timeRange.interval);
  const timeSlots = scheduleCouples(times, couples.data, currentHeats.data);
  return timeSlots;
}
function generateTimeIntervals(startDate, endDate, intervalMinutes) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const intervalMillis = intervalMinutes * 60 * 1000;

  const times = [];
  for (let currentTime = start; currentTime <= end; currentTime = new Date(currentTime.getTime() + intervalMillis)) {
    times.push(currentTime.toISOString());
  }

  return times;
}

function scheduleCouples(timeslots, couples, currentHeats) {
  let heats = []; // To store the final heats with scheduled couples
  let usedCombinations = new Set(); // To track used (dance, ageCategory, level) combinations for each couple
  let participantsInHeat = new Set(); // To track all participants (leaders and followers) in the current heat

  // Sort timeslots by datetime to ensure they are in order
  let sortedTimeslots = timeslots.sort((a, b) => new Date(a) - new Date(b));

  // Start numbering heats from 1
  let heatNumber = 1;

  sortedTimeslots.forEach((timeslot) => {
    // Check if there's an existing heat for this timeslot
    if (currentHeats.length > 0 && new Date(currentHeats[0].dateTime) <= new Date(timeslot)) {
      // If so, reuse the existing heat
      let existingHeat = currentHeats.shift();
      heats.push(existingHeat);
      return;
    }

    // Create a new heat
    let heat = {
      number: heatNumber, // Numbering the heats sequentially
      couples: [],
      dateTime: timeslot,
      dance: null,
      ageCategory: null,
      level: null,
    };

    participantsInHeat.clear();

    for (let couple of couples) {
      let dance = couple.dance._id;
      let ageCategory = couple.ageCategory;
      let level = couple.level;
      let combination = `${couple.id}-${dance}-${ageCategory}-${level}`;
      let leaderId = couple.leader._id;
      let followerId = couple.follower._id;

      // Check if the couple's combination is already used in this heat or any previous heat
      if (usedCombinations.has(combination)) {
        continue;
      }

      // Check if the leader or follower is already in this heat (as either leader or follower)
      if (participantsInHeat.has(leaderId) || participantsInHeat.has(followerId)) {
        continue;
      }

      // If this is the first couple in the heat, set the dance, ageCategory, and level for this heat
      if (!heat.dance) {
        heat.dance = dance;
        heat.ageCategory = ageCategory;
        heat.level = level;
      }

      // Ensure this couple's combination matches the heat's dance, ageCategory, and level
      if (heat.dance === dance && heat.ageCategory === ageCategory && heat.level === level) {
        // Add couple to the heat
        heat.couples.push(couple);
        usedCombinations.add(combination);
        participantsInHeat.add(leaderId);
        participantsInHeat.add(followerId);

        // If the heat is full, stop adding more couples
        if (heat.couples.length === 8) {
          break; // Stop adding couples once the heat is full
        }
      }
    }

    // Only add the heat if it has at least one couple
    if (heat.couples.length > 0) {
      heats.push(heat);
      heatNumber++;
    }
  });
  return heats;
}
