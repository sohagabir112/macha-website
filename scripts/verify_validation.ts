
import { isValidEmail, isValidPassword, isValidUsername } from '../utils/validation';

const runTests = () => {
    let passed = 0;
    let failed = 0;

    const assert = (condition: boolean, message: string) => {
        if (condition) {
            console.log(`✅ ${message}`);
            passed++;
        } else {
            console.error(`❌ ${message}`);
            failed++;
        }
    };

    console.log("Running Validation Tests...\n");

    // Email Tests
    assert(isValidEmail("test@example.com") === true, "Valid email should pass");
    assert(isValidEmail("user.name+tag@example.co.uk") === true, "Complex valid email should pass");
    assert(isValidEmail("invalid-email") === false, "Email without @ should fail");
    assert(isValidEmail("user@") === false, "Email without domain should fail");
    assert(isValidEmail("@example.com") === false, "Email without username should fail");
    assert(isValidEmail("user@example") === false, "Email without TLD should fail"); // My simple regex expects a dot

    console.log("");

    // Password Tests
    assert(isValidPassword("password123") === true, "Password >= 6 chars should pass");
    assert(isValidPassword("123456") === true, "Password with exactly 6 chars should pass");
    assert(isValidPassword("12345") === false, "Password < 6 chars should fail");
    assert(isValidPassword("") === false, "Empty password should fail");

    console.log("");

    // Username Tests
    assert(isValidUsername("user123") === true, "Alphanumeric username should pass");
    assert(isValidUsername("usr") === true, "Username with 3 chars should pass");
    assert(isValidUsername("this_is_a_long_user") === true, "Username with underscores should pass"); // 19 chars
    assert(isValidUsername("us") === false, "Username < 3 chars should fail");
    assert(isValidUsername("user-name") === false, "Username with hyphen should fail (based on my regex)");
    assert(isValidUsername("user@name") === false, "Username with special chars should fail");
    assert(isValidUsername("verylongusername12345") === false, "Username > 20 chars should fail");

    console.log(`\nTests Completed: ${passed} Passed, ${failed} Failed`);

    if (failed > 0) {
        process.exit(1);
    }
};

runTests();
