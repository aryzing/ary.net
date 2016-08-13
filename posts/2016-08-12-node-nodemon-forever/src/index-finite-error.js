for (var i = 0; i < 10; i++) {
  console.log('Running...');
  if (Math.random() > 0.8) {
    throw '20% chance of failing';
  }
}
