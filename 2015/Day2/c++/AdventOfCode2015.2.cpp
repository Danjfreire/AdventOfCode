#include <iostream>
#include <fstream>
#include <string>
#include <array>
#include <algorithm>

using namespace std;

struct dimensions {
	int l;
	int w;
	int h;
};

dimensions getDimensions(string input) {
	string delimiter = "x";
	int dimensionvalues[3];
	int start = 0;
	int end = 0;
	int iteration = 0;

	while (iteration < 3) {
		end = input.find(delimiter, start);
		dimensionvalues[iteration] = stoi(input.substr(start, end - start));
		start = end + delimiter.size();
		iteration++;
	}

	dimensions d;
	d.l = dimensionvalues[0];
	d.w = dimensionvalues[1];
	d.h = dimensionvalues[2];

	return d;
}

int main()
{
	ifstream inputFile("input.txt");

	string line;
	int totalPaper = 0;
	int totalRibbon = 0;
	dimensions d;
	array<int, 3>dimensions;

	while (getline(inputFile, line)) {
		d = getDimensions(line);
		dimensions = {d.l, d.w, d.h};
		
		std::sort(dimensions.begin(), dimensions.end());

		totalPaper += (2 * d.l * d.w) + (2 * d.w * d.h) + (2 * d.h * d.l);
		totalPaper += dimensions[0] * dimensions[1];

		totalRibbon += dimensions[0] + dimensions[0] + dimensions[1] + dimensions[1];
		totalRibbon += d.l * d.w * d.h;

		//std::cout << "l :" << d.l << ", w :" << d.w << ", h :" << d.h << "\n";
	}

	inputFile.close();

	std::cout << "total paper needed : " << totalPaper << " square feet";
	std::cout << "\n";
	std::cout << "total ribbon needed : " << totalRibbon << " square feet";
}

