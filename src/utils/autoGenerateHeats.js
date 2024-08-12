export function autoGenerateHeats(timeRange, couples) {
  const times = generateTimeIntervals(timeRange.start.toDate(), timeRange.end.toDate(), timeRange.interval);
  const timeSlots = scheduleCouples(times, couples.data);
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

function scheduleCouples(timeSlots, couples) {
  const schedule = [];
  const usedDancers = new Set();
  const coupleDanceHistory = new Map();

  for (const slot of timeSlots) {
    const slotDetails = new Set();
    const scheduledSlot = {
      dateTime: new Date(slot),
      couples: [],
      dance: null,
    };

    for (const couple of couples) {
      const leaderId = couple.leader._id;
      const followerId = couple.follower._id;
      const danceId = couple.dance._id;
      const ageCategory = couple.ageCategory;
      const level = couple.level;
      const coupleId = couple.id;
      const coupleDetails = `${danceId}-${ageCategory}-${level}`;

      if (!coupleDanceHistory.has(coupleId)) {
        coupleDanceHistory.set(coupleId, new Set());
      }

      // Check if the couple has already performed this combination in any time slot
      const canAddCouple =
        scheduledSlot.couples.length < 8 && !usedDancers.has(leaderId) && !usedDancers.has(followerId) && !coupleDanceHistory.get(coupleId).has(coupleDetails); // Ensure the couple has not danced this combination before

      if (canAddCouple) {
        scheduledSlot.couples.push(couple);
        usedDancers.add(leaderId);
        usedDancers.add(followerId);
        slotDetails.add(coupleDetails);
        coupleDanceHistory.get(coupleId).add(coupleDetails);

        if (!scheduledSlot.dance) {
          scheduledSlot.dance = couple.dance._id;
        }

        if (scheduledSlot.couples.length === 8) break;
      }
    }
    usedDancers.clear(); // clear for the next time slot

    if (scheduledSlot.couples.length > 0) {
      schedule.push(scheduledSlot);
    }

    if (couples.every((c) => usedDancers.has(c.leader._id) && usedDancers.has(c.follower._id))) {
      break;
    }
  }

  return schedule;
}
