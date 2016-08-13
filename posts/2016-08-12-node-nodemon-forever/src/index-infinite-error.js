while (1) {
  console.log('Running...');
  if (Math.random() > 0.8) {
    throw '20% chance of failing';
  }
}
