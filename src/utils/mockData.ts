/**
 * Generates mock data for the activity list.
 * @param count Number of activities to generate.
 * @returns An array of activity objects.
 */
export function generateMockActivityData(count: number = 50) {
    const activities = ["Running", "Reading", "Yoga", "Cycling", "Cooking", "Coding"];
  
    const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];
    const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    const getRandomDate = (start: Date, end: Date): string => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
    };
  
    return Array.from({ length: count }, (_, index) => ({
      id: (index + 1).toString(), // Sequential ID as a simple identifier
      name: getRandomItem(activities),
      duration: getRandomNumber(10, 120), // Random duration in minutes
      date: getRandomDate(new Date("2023-01-01"), new Date()), // Random date between start of 2023 and today
    }));
  }
  