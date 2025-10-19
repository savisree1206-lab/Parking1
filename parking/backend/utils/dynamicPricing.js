// Dynamic Pricing Calculator

const PEAK_HOURS = [
  { start: 8, end: 10 }, // Morning peak
  { start: 17, end: 20 }, // Evening peak
];

const PRICING_MULTIPLIERS = {
  peak: 1.5,
  normal: 1.0,
  off_peak: 0.8,
  weekend: 1.2,
};

const isPeakHour = (hour) => {
  return PEAK_HOURS.some((peak) => hour >= peak.start && hour < peak.end);
};

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

const calculateDynamicPrice = (basePrice, startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const hours = Math.ceil((end - start) / (1000 * 60 * 60));
  
  let totalPrice = 0;
  let currentTime = new Date(start);
  
  for (let i = 0; i < hours; i++) {
    const hour = currentTime.getHours();
    let multiplier = PRICING_MULTIPLIERS.normal;
    
    // Check if weekend
    if (isWeekend(currentTime)) {
      multiplier = PRICING_MULTIPLIERS.weekend;
    }
    
    // Check if peak hour (overrides weekend)
    if (isPeakHour(hour)) {
      multiplier = PRICING_MULTIPLIERS.peak;
    }
    
    // Check if off-peak (late night)
    if (hour >= 22 || hour < 6) {
      multiplier = PRICING_MULTIPLIERS.off_peak;
    }
    
    totalPrice += basePrice * multiplier;
    currentTime.setHours(currentTime.getHours() + 1);
  }
  
  return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
};

const getPricingInfo = (startTime) => {
  const date = new Date(startTime);
  const hour = date.getHours();
  
  let category = 'normal';
  let multiplier = PRICING_MULTIPLIERS.normal;
  
  if (isWeekend(date)) {
    category = 'weekend';
    multiplier = PRICING_MULTIPLIERS.weekend;
  }
  
  if (isPeakHour(hour)) {
    category = 'peak';
    multiplier = PRICING_MULTIPLIERS.peak;
  }
  
  if (hour >= 22 || hour < 6) {
    category = 'off_peak';
    multiplier = PRICING_MULTIPLIERS.off_peak;
  }
  
  return { category, multiplier };
};

module.exports = {
  calculateDynamicPrice,
  getPricingInfo,
  PRICING_MULTIPLIERS,
};
