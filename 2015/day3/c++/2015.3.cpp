#include <iostream>
#include <fstream>
#include <string>
#include <map>

using namespace std;

void santaDelivery() {
	ifstream inputFile("input.txt");

	string line;
	int currentX = 0;
	int currentY = 0;
	std::map<string, int>houseMap;
	houseMap["0,0"] = 1;
	string currentHouse = "";
	int uniqueHousesPassed = 1;

	while (getline(inputFile, line)) {
		for (char input : line) {

			switch (input)
			{
			case '<': {currentX -= 1; break;}
			case '>': {currentX += 1; break;}
			case 'v': {currentY -= 1; break;}
			case '^': {currentY += 1; break;}
			default:
				break;
			}

			currentHouse = std::to_string(currentX) + "," + std::to_string(currentY);
			if (!houseMap[currentHouse]) {
				houseMap[currentHouse] = 1;
				uniqueHousesPassed++;
			}
		}
	}

	inputFile.close();

	std::cout << "Unique houses passed by Santa : " << uniqueHousesPassed;
}

void santaAndRobotDelivery() {
	ifstream inputFile("input.txt");

	string line;
	
	int currentSantaX = 0;
	int currentSantaY = 0;
	int currentRobotX = 0;
	int currentRobotY = 0;

	string currentHouse = "";
	std::map<string, int>houseMap;
	houseMap["0,0"] = 2;
	
	int uniqueHousesPassed = 1;
	int iteration = 0;

	int* currentX;
	int* currentY;

	while (getline(inputFile, line)) {
		for (char input : line) {

			if (iteration % 2 == 0) {
				currentX = &currentSantaX;
				currentY = &currentSantaY;
			}
			else {
				currentX = &currentRobotX;
				currentY = &currentRobotY;
			}

			switch (input)
			{
			case '<': {*currentX -= 1; break;}
			case '>': {*currentX += 1; break;}
			case 'v': {*currentY -= 1; break;}
			case '^': {*currentY += 1; break;}
			default:
				break;
			}

			currentHouse = std::to_string(*currentX) + "," + std::to_string(*currentY);
			if (!houseMap[currentHouse]) {
				houseMap[currentHouse] = 1;
				uniqueHousesPassed++;
			}
			iteration++;
		}
	}

	inputFile.close();

	std::cout << "Unique houses passed by Santa + Robot : " << uniqueHousesPassed;
}

int main()
{
	santaDelivery();
	std::cout << "\n";
	santaAndRobotDelivery();
}
