## Why this folder exist?
For some reason, the `minecraft-data` package doesn't collect all available metadata from certain blocks, as is the case with `minecraft:concrete`, where it has metadata for color variation.

Because this, it is necessary to manually add all these metadata.

The [PopulateDatabase](../../scripts/PopulateDatabase.ts) script would automatically insert these values into their respective blocks and register on database, it is only necessary to add it to the json files inside the static folder in the following format:

```jsonc
{
  "minecraft:BLOCK_ID": {
    "metadata": [
      {
        "data": 0,
        "name": "A block variation"
      }
    ]
  }
}
```

## Contact

Leonardo Luiz Gava - [@llgava](https://twitter.com/llgava "Leonardo Luiz Gava Twitter") - <llgavamt@gmail.com> | <me@llgava.net>
