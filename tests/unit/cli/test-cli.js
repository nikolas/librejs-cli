test('Test that cli works', 3, function() {
    ok(CLI);
    ok(true, 'this test is fine');

    var cli = new CLI();
    equal(typeof cli.run, 'function');
});
