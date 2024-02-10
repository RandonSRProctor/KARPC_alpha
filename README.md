# Khalil & Randy's Public Conversation (Alpha)

_A mashup of a public forum, a message board, and a Twitter clone._

_Created by Khalil & Randy, as a way to test modern JS/TS's full-stack modules_

## ⚡️ Quick Start

This step will sequentially run all steps in the `Incremental Start` section. It is advised that you read through the `Incremental Start` section to understand what will happen; consider manually running all of the steps first, and then using this script for future uses.

```shell
## Does not exist yet
```

## ⚙️ Incremental Start

### 0. Prerequisites

Please have [MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html) installed and running on your machine.

### 1. Set up your environment variables

Create a `.env` file in the root of the `server` package/directory and create the following variables (values should reflect your environment setup, the shown values are likely default values)

```shell
MYSQL_HOST='127.0.0.1'        # Local host
MYSQL_USER='root'             # MySQL default username
MYSQL_PASSWORD=''             # MySQL default password
MYSQL_DATABASE='karpc_alpha'  # Used in next step
```

### 2. Run DB script

**WARNING**: Ensure that the value set in the previous step to `MYSQL_DATABASE` is not already the name of a database that you are not prepared to lose. The script in this step **will DELETE any database of the same name**.

In a terminal, navigate to the `server` directroy/package and run this command `npm run script-tbd`

### 3. Start Server

### 4. Start Client
