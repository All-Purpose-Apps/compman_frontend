export function autoGenerateHeats(schedules, entries, currentHeats) {
  let allHeats = [];
  // Initialize the heat number based on current heats
  let heatNumber = currentHeats.length ? Math.max(...currentHeats.map((h) => h.number)) + 1 : 1;
  // Iterate over each schedule to generate time slots and schedule entries accordingly
  schedules.forEach((schedule) => {
    const times = generateTimeIntervals(schedule.startDate, schedule.endDate, 1.5); // 1.5 minutes interval
    const allowedDances = schedule.dances.map((dance) => dance._id);
    // Pass heatNumber as a reference so it updates globally
    const timeSlots = scheduleEntries(times, entries, currentHeats, allowedDances, heatNumber);
    allHeats = allHeats.concat(timeSlots);

    // Update the global heatNumber after scheduling
    heatNumber = allHeats.length ? Math.max(...allHeats.map((h) => h.number)) + 1 : heatNumber;
  });

  return allHeats;
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

function scheduleEntries(timeslots, entries, currentHeats, allowedDances, heatNumber) {
  let heats = []; // To store the final heats with scheduled entries
  let usedCombinations = new Set(); // To track used (dance, ageCategory, level) combinations for each entry
  let heatMap = new Map(); // To map timeslots to their respective heats
  // Sort timeslots by datetime to ensure they are in order
  let sortedTimeslots = timeslots.sort((a, b) => new Date(a) - new Date(b));

  // Populate the heatMap with currentHeats and mark used combinations
  currentHeats.forEach((heat) => {
    heatMap.set(heat.dateTime, heat);
    heat.entries.forEach((entry) => {
      let combination = `${entry._id}-${entry.dance._id}-${entry.ageCategory}-${entry.level}`;
      usedCombinations.add(combination);
    });
  });

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
        entries: [],
        dateTime: timeslot,
        dance: null,
        ageCategory: null,
        level: null,
      };
      heatMap.set(timeslot, heat);
    }

    let participantsInHeat = new Set(heat.entries.flatMap((entry) => [entry.leader._id, entry.follower._id]));

    for (let entry of entries) {
      let dance = entry.dance._id;
      let ageCategory = entry.ageCategory;
      let level = entry.level;
      let combination = `${entry._id}-${dance}-${ageCategory}-${level}`;
      let leaderId = entry.leader._id;
      let followerId = entry.follower._id;
      // Check if the entry's combination is already used in this heat or any previous heat
      if (usedCombinations.has(combination)) {
        continue;
      }

      // Check if the dance is allowed in the current time range (schedule)
      if (!allowedDances.includes(dance)) {
        continue;
      }

      // Check if the leader or follower is already in this heat (as either leader or follower)
      if (participantsInHeat.has(leaderId) || participantsInHeat.has(followerId)) {
        continue;
      }

      // If this is the first entry in the heat, set the dance, ageCategory, and level for this heat
      if (!heat.dance) {
        heat.dance = dance;
        heat.ageCategory = ageCategory;
        heat.level = level;
      }

      // Ensure this entry's combination matches the heat's dance, ageCategory, and level
      if (heat.dance === dance && heat.ageCategory === ageCategory && heat.level === level) {
        // Add entry to the heat
        heat.entries.push(entry);
        usedCombinations.add(combination);
        participantsInHeat.add(leaderId);
        participantsInHeat.add(followerId);

        // If the heat is full, stop adding more entries
        if (heat.entries.length === 8) {
          break; // Stop adding entries once the heat is full
        }
      }
    }

    // Only add the heat to the final list if it has at least one entry and it doesn't already exist
    if (!heats.includes(heat) && heat.entries.length > 0) {
      heats.push(heat);
    }

    // Update the lastHeat to the current heat
    lastHeat = heat;
  });

  return heats;
}
