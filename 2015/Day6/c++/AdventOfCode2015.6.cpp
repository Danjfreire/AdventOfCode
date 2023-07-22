#include <iostream>
#include <fstream>
#include <string>
#include <regex>

using namespace std;

void part1() {
	ifstream input("input.txt");

	string line = "";
	regex pattern(R"((.*) (\d+),(\d+) through (\d+),(\d+))");
	smatch matches;

	string operation = "";
	int x1 = 0;
	int y1 = 0;
	int x2 = 0;
	int y2 = 0;

	vector<vector<bool>> lights(1000, vector<bool>(1000, false));

	while (getline(input, line)) {

		if (!regex_match(line, matches, pattern)) {
			cout << "Invalid command" << endl;
			break;
		}

		operation = matches[1];
		x1 = stoi(matches[2]);
		y1 = stoi(matches[3]);
		x2 = stoi(matches[4]);
		y2 = stoi(matches[5]);

		for (int x = x1; x <= x2; x++) {
			for (int y = y1; y <= y2; y++) {
				if (operation == "turn on") {
					lights[x][y] = true;
				}
				else if (operation == "turn off") {
					lights[x][y] = false;
				}
				else if (operation == "toggle") {
					lights[x][y] = !lights[x][y];
				}
				else {
					cout << "Invalid command" << endl;
					break;
				}
			}
		}
	}

	input.close();

	int lightsOn = 0;

	for (int x = 0; x < lights.size(); x++) {
		for (int y = 0; y < lights[x].size(); y++) {
			if (lights[x][y]) {
				lightsOn++;
			}
		}
	}

	cout << "Part 1 - Lights on: " << lightsOn << endl;
}

void part2() {
	ifstream input("input.txt");

	string line = "";
	regex pattern(R"((.*) (\d+),(\d+) through (\d+),(\d+))");
	smatch matches;

	string operation = "";
	int x1 = 0;
	int y1 = 0;
	int x2 = 0;
	int y2 = 0;

	vector<vector<int>> lights(1000, vector<int>(1000, 0));

	while (getline(input, line)) {

		if (!regex_match(line, matches, pattern)) {
			cout << "Invalid command" << endl;
			break;
		}

		operation = matches[1];
		x1 = stoi(matches[2]);
		y1 = stoi(matches[3]);
		x2 = stoi(matches[4]);
		y2 = stoi(matches[5]);

		for (int x = x1; x <= x2; x++) {
			for (int y = y1; y <= y2; y++) {
				if (operation == "turn on") {
					lights[x][y] += 1;
				}
				else if (operation == "turn off") {
					lights[x][y] = lights[x][y] > 0 ? lights[x][y] - 1 : lights[x][y];
				}
				else if (operation == "toggle") {
					lights[x][y] += 2;
				}
				else {
					cout << "Invalid command" << endl;
					break;
				}
			}
		}
	}

	input.close();

	int totalBrightness = 0;

	for (int x = 0; x < lights.size(); x++) {
		for (int y = 0; y < lights[x].size(); y++) {
			if (lights[x][y]) {
				totalBrightness += lights[x][y];
			}
		}
	}

	cout << "Part 2 - Total Brightness: " << totalBrightness << endl;
}

int main() {
	part1();
	part2();

	return 0;
}