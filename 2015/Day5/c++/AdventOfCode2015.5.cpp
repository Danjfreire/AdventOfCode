#include <iostream>
#include <string>
#include <fstream>

using namespace std;

bool isStringNice2(string entry) {
	bool hasLetterRepetition = false;
	bool hasSequenceRepetition = false;

	string sequence = "";

	for (int i = 0; i < entry.length(); i++) {
		if (i < entry.length() - 2) {
			if (entry[i] == entry[i + 2]) {
				hasLetterRepetition = true;
			}
		}

		if (i > 0 && i < entry.length() - 1) {
			sequence += entry[i - 1];
			sequence += entry[i];
			if (entry.find(sequence, i + 1) != std::string::npos) {
				hasSequenceRepetition = true;
			}
		}

		sequence = "";
	}

	/*std::cout << "hasLetterRepetion : " << hasLetterRepetition << "\n";
	std::cout << "hasSequenceRepetition : " << hasSequenceRepetition << "\n";*/

	return hasLetterRepetition && hasSequenceRepetition;
}

bool isStringNice1(string entry) {

	if (entry.find("ab") != std::string::npos || entry.find("cd") != std::string::npos || entry.find("pq") != std::string::npos || entry.find("xy") != std::string::npos) {
		return 0;
	}

	char vowels[5] = { 'a','e','i','o','u' };
	int numberOfVowels = 0;

	bool hasRepeatedLetter = false;
	for (int i = 0; i < entry.length(); i++) {
		if (i < entry.length() - 1 && entry[i] == entry[i + 1]) {
			hasRepeatedLetter = true;
		}
		if (find(begin(vowels), end(vowels), entry[i]) != end(vowels)) {
			numberOfVowels++;
		}
	}

	return numberOfVowels >= 3 && hasRepeatedLetter;
}

int main()
{
	ifstream input("input.txt");
	int niceStrings1 = 0;
	int niceStrings2 = 0;
	string line = "";

	while (getline(input, line)) {
		if (isStringNice1(line)) {
			niceStrings1++;
		}

		if (isStringNice2(line)) {
			niceStrings2++;
		}
	}

	input.close();

	//std::cout << isStringNice2("ieodomkazucvgmuy") << "\n";

	std::cout << "Nice strings1 : " << niceStrings1;
	std::cout << "\n";
	std::cout << "Nice strings2 : " << niceStrings2;
}

