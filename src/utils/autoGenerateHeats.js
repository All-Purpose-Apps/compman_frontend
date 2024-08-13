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
  let heatMap = new Map(); // To map timeslots to their respective heats

  // Sort timeslots by datetime to ensure they are in order
  let sortedTimeslots = timeslots.sort((a, b) => new Date(a) - new Date(b));

  // Populate the heatMap with currentHeats and mark used combinations
  currentHeats.forEach((heat) => {
    heatMap.set(heat.dateTime, heat);
    heat.couples.forEach((couple) => {
      let combination = `${couple.id}-${couple.dance}-${couple.ageCategory}-${couple.level}`;
      usedCombinations.add(combination);
    });
  });

  // Start numbering heats from the current max number
  let heatNumber = currentHeats.length ? Math.max(...currentHeats.map((h) => h.number)) + 1 : 1;
  let lastHeat = null; // To keep track of the last created or filled heat

  sortedTimeslots.forEach((timeslot) => {
    let currentTime = new Date(timeslot);
    let heat;

    // Check if there's an overlap of 90 seconds with the last heat
    if (lastHeat && currentTime - new Date(lastHeat.dateTime) <= 90000) {
      heat = lastHeat;
    } else if (heatMap.has(timeslot)) {
      // Use the existing heat if it's already in the heatMap
      heat = heatMap.get(timeslot);
    } else {
      // Create a new heat if it doesn't exist and there's no overlap
      heat = {
        number: heatNumber++,
        couples: [],
        dateTime: timeslot,
        dance: null,
        ageCategory: null,
        level: null,
      };
      heatMap.set(timeslot, heat);
    }

    let participantsInHeat = new Set(heat.couples.flatMap((couple) => [couple.leader._id, couple.follower._id]));

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

    // Only add the heat to the final list if it has at least one couple and it doesn't already exist
    if (!heats.includes(heat) && heat.couples.length > 0) {
      heats.push(heat);
    }

    // Update the lastHeat to the current heat
    lastHeat = heat;
  });

  return heats;
}
