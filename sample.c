#include <stdio.h>
#include <string.h>

int main() {
    char password[10];
    // Hardcoded secret (bad practice)
    strcpy(password, "admin123");  

    // Buffer overflow risk: no bounds checking
    char input[5];
    printf("Enter something: ");
    gets(input);  // ⚠️ gets() is unsafe, deprecated

    // Wrong comparison (assignment instead of equality check)
    int x = 5;
    if (x = 10) {
        printf("x is 10\n");
    } else {
        printf("x is not 10\n");
    }

    // Uninitialized variable
    int y;
    if (y > 0) {
        printf("y is positive\n");
    }

    return 0;
}
