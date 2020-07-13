//class to keep track of people inside and outside and left shop
package socialDistanceShopSampleSolution;
public class PeopleCounter {
	private int peopleOutSide; //counter for people arrived but not yet in the building
	private int peopleInside; //people inside the shop
	private int peopleLeft; //people left the shop
	private int maxPeople; //maximum for lockdown rules
	
	PeopleCounter(int max) {
		peopleOutSide = 0;
		peopleInside = 0;
		peopleLeft = 0;
		maxPeople = max;
	}
		
	//getter
	public int getWaiting() {
		return peopleOutSide;
	}

	//getter
	public synchronized int getInside() {
		return peopleInside;
	}
	
	//getter
	public int getTotal() {
		return (peopleOutSide+peopleInside+peopleLeft);
	}

	//getter
	public int getLeft() {
		return peopleLeft;
	}
	
	//getter
	public int getMax() {
		return maxPeople;
	}
	
	//getter
	public void personArrived() {
		peopleOutSide++;
	}
	
	//update counters for a person entering the shop
	public void personEntered() {
		peopleOutSide--;
		peopleInside++;
	}

	//update counters for a person exiting the shop
	public void personLeft() {
		peopleInside--;
		peopleLeft++;
		
	}

	//reset - not really used
	synchronized public void resetScore() {
		peopleInside = 0;
		peopleOutSide = 0;
		peopleLeft = 0;
	}
}
