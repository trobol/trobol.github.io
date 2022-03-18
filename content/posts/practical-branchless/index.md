---
title: "Branchless Programming: An Almost Practical Example"
description: 
publishdate: 
draft: true
---

# Branchless Programming: An Almost Practical Example

I finally encountered a situation outside of shaders where branchless programming is *almost* practical.


## Brief Introduction to Brachless Programming


## Problem Description

## Before


``` c 
for(uint16_t i = 0; i < num_coords; i++) {
	flags_t flags = flags_buf[i];
	int16_t x;
	if (flags.shortx) { // x short?
		uint8_t x_short = *(fptr++);
		if (flags.samex) x = ((int16_t)x_short);
		else x = -((int16_t)x_short);
	} else {
		if (flags.samex) x = 0;
		else { read16(x); }
	}
	xcoords_buf[i] = x;
}
```

## After


``` c
uint16_t j = 0;
for(uint16_t i = 0; i < num_coords; i++) {
	flags_t flags = flags_buf[i];
	
	// every bit is 1 if short flag is set, zero otherwise
	uint16_t sh = ~(((flags.shortx) >> 1)-1); 
	// every bit is 1 if same flag is NOT set, zero otherwise
	uint16_t n_sm = ((flags.samex) >> 4)-1;   

	// zero if not short and not same, otherwise next byte
	uint16_t x_0 = fptr[j] & ~sh & n_sm; 
	// zero if not short and not same, otherwise next byte
	uint16_t x_1 = fptr[j+1] & ~sh & n_sm; 

	 // if short flag, xor with n_sm computes ones complement, add one if negative for twos complement
	x_1 += (fptr[j] & sh ^ n_sm) + (1 & n_sm);
	
	j += 2;
	j -= sh & 1;
	j -= (~n_sm & ~sh) & 2;

	coords_buf[i].x = x_0 << 8 | x_1;
}
```
