---
title: Generating signed distance fields for rendering vector graphics
description:
publishdate: 2022-05-2
---

# Generating Signed Distance Fields for rendering vector graphics

Note: for this post I will mainly be talking about rendering text, but the technique can be used for any form vector graphics.

## 1. What & Why

### The problem:

The simplest way to render text is to draw all the characters onto a texture and simply sample from that texture. Lets say we want our texture to be 2048 x 2048 pixels, so each character can be about 180 x 180.

The easiest way is to say, if our pixel is inside the character, its white otherwise its black.
But we can see the result is VERY choppy, and when it gets upscaled the choppyness stays.

{{< image src="./img/letter_2048.png" size="small" >}}
{{< image src="./img/letter_2048_linear.png" size="small" >}}

We can improve that by calculating how much the pixel is inside the shape and storing that instead of just white or black.
This smooths things out at resolutions smaller than our target, but once again upscaling makes things a blurry mess.

{{< image src="./img/letter_2048_AA.png" size="small" >}}
{{< image src="./img/letter_2048_AA_linear.png" size="small" >}}


Now of course we could improve this by rendering our characters at higher resolutions, but in order to keep our letters looking as sharp as possible, we would have to render at the highest possible resolution they could be displayed at. 
This is not feasible. If we were to target a 1080p monitor and render our characters that tall we would need at least 100 MB to store an entire font style. Thats a significant amount of storage considering we need to duplicate that for every font STYLE. That means if we have we have just one font with bold, italic and regular we would use more than a 3rd of a GB. 

If we were to target a 4k monitor and render our characters that tall we would need 14 MB to store each character and 1.8 GB to store a whole font

Crisp 4k A

{{< image src="./img/letter_4k.png" size="small" >}}

&nbsp;&nbsp;&nbsp;&nbsp;



### The solution

//very basic description of sdf

//description of how pixels are interpolated and how that works with sdf

//description of how sdf are actually rendered

//circle visualization diagram

//bonus features of sdfs

## 2. How

//how I actually went about generating the sdfs


