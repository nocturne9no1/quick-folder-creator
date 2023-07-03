# quick-folder-creator

## Create a recurring file at once!

## How To Use

- Enter the file and content you want to create in the `.vscode` folder settings.json of the project root.
- Below is an example.

```json
  "quickFileSetting": [
    {
      "extension": ".tsx",
      "template": "import { useState, useEffect } from 'react';\nimport classNames from 'classnames/bind';\nimport style from './${folderName}.module.scss'\n\nconst cx = classNames.bind(style);\n\ninterface Props {\n\t\n}\n\nconst ${folderName} = ({}: Props) => {\n\treturn (\n\t\t\n\t);\n}\n\nexport { ${folderName} };"
    },
    {
      "extension": ".module.scss",
      "template": ""
    },
    {
      "extension": ".stories.tsx",
      "template": "import type { Meta, StoryObj } from '@storybook/react';\nimport { ${folderName} } from './${folderName}';\n\nconst meta: Meta<typeof ${folderName}> = {\n\tcomponent: ${folderName},\n\targTypes: {\n\t\t\n}\n\t};\n\nexport default meta;\ntype Story = StoryObj<typeof ${folderName}>;\n\nexport const Default: Story = {\n\targs: {\n\t\t\n\t}\n};"
    },
    {
      "name": "index.tsx",
      "template": "import { ${folderName} } from \"./${folderName}\";\n\nexport { ${folderName} };\n"
    }
  ]
```

- Click `Create file bundles~ʕっ•ﻌ•ʔっ` in VS Code explorer
- Enter your folder name.
- Then you can make files at once!
