// make sure to install the openssl package for MD5
#include <iostream>
#include <openssl/evp.h>
#include <string>
#include <sstream>
#include <iomanip>

using namespace std;

// to avoid compile warnings
#pragma warning(disable : 4996)
std::string md5(const std::string& str) {
	EVP_MD_CTX* context = EVP_MD_CTX_new();
	const EVP_MD* md = EVP_md5();
	unsigned char md_value[EVP_MAX_MD_SIZE];
	unsigned int  md_len;
	string        output;

	EVP_DigestInit_ex2(context, md, NULL);
	EVP_DigestUpdate(context, str.c_str(), str.length());
	EVP_DigestFinal_ex(context, md_value, &md_len);
	EVP_MD_CTX_free(context);

	output.resize(md_len * 2);
	for (unsigned int i = 0; i < md_len; ++i)
		std::sprintf(&output[i * 2], "%02x", md_value[i]);
	return output;
}

int main()
{
	const string input = "iwrupvqb";

	bool part1Matched = false;
	const string part1Match = "00000";
	const string part2Match = "000000";

	int number = 1;
	string currentMd5;

	while (true) {
		currentMd5 = md5(input + to_string(number));

		if (number % 100000 == 0) {
			std::cout << number << "\n";
		}

		if (currentMd5.substr(0, part1Match.length()) == part1Match && !part1Matched) {
			std::cout << "Part 1 match : " << number << "\n";
			part1Matched = true;
		}

		if (currentMd5.substr(0, part2Match.length()) == part2Match) {
			std::cout << "Part 2 match : " << number << "\n";
			break;
		}

		number++;
	}

}
