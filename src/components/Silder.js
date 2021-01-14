const slider = document.getElementById('offset');

const scaleY = (amplitude, height) => {
    const range = 256;
    const offset = 128;
  
    return height - ((amplitude + offset) * height) / range;
  };
  
  const drawWaveform = (canvas, waveform, offsetX) => {
    const ctx = canvas.getContext('2d');
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (offsetX > waveform.length - canvas.width) {
      offsetX = waveform.length - canvas.width;
    }
  
    const waveformHeight = canvas.height / waveform.channels;
  
    for (let c = 0, offsetY = 0; c < waveform.channels; c++, offsetY += waveformHeight) {
      const channel = waveform.channel(c);
  
      ctx.beginPath();
  
      for (let x = 0, i = offsetX; x < canvas.width && i < waveform.length; x++, i++) {
        const val = channel.max_sample(i);
  
        ctx.lineTo(x + 0.5, offsetY + scaleY(val, waveformHeight) + 0.5);
      }
  
      for (let x = canvas.width - 1, i = offsetX + canvas.width - 1; x >= 0; x--, i--) {
        const val = channel.min_sample(i);
  
        ctx.lineTo(x + 0.5, offsetY + scaleY(val, waveformHeight) + 0.5);
      }
  
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }
  
  const updateOffsetSlider = (waveform) => {
    slider.min = 0;
    slider.max = waveform.length - canvas.width;
    slider.max = waveform.length - canvas2.width;
    slider.max = waveform.length - canvas3.width;
    slider.max = waveform.length - canvas4.width;
  slider.step = 1;
    slider.value = 0;
  };
  
  slider.addEventListener('input', (event) => {
    const offsetX = parseInt(event.target.value, 10);
  