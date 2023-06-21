#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main()
{
	ifstream inputFile("input.txt");

	string line;
	int floor = 0;
	int basementInputPosition = -1;
	int iteration = 1;

	while (getline(inputFile, line)) {
		for (char op : line) {
			if (op == '(') {
				floor++;
			}
			else if (op == ')') {
				floor--;
				if (floor == -1 && basementInputPosition == -1) {
					basementInputPosition = iteration;
				}
			}
			iteration++;
		}
	}

	inputFile.close();

	std::cout << "Final floor :" << floor;
	std::cout << "\n";
	std::cout << "Basement floor position : " << basementInputPosition;

	return 1;
}
