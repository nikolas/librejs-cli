test('Test that cli works', function() {
    ok(run);
    ok(interpret);

    equal(typeof run, 'function');
    equal(typeof interpret, 'function');
});
